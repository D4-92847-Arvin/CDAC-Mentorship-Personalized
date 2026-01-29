using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;
using PaymentService.Data;
using PaymentService.Models;
using Newtonsoft.Json.Linq;


namespace PaymentService.Controllers
{
    [ApiController]
    [Route("api/payment")]
    public class PaymentController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly PaymentDbContext _db;
        private readonly HttpClient _http;

        public PaymentController(IConfiguration config, PaymentDbContext db)
        {
            _config = config;
            _db = db;
            _http = new HttpClient();
        }

        // ==========================
        // CREATE ORDER (Razorpay REST API)
        // ==========================
        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrder([FromBody] PaymentRequest request)
        {
            var key = _config["Razorpay:Key"];
            var secret = _config["Razorpay:Secret"];

            using var client = new HttpClient();

            var authToken = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{key}:{secret}"));
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Basic", authToken);

            int amountInPaise = (int)(request.Amount * 100);

            var payload = new
            {
                amount = amountInPaise,
                currency = "INR",
                receipt = $"student_{request.StudentId}_plan_{request.PlanId}"
            };

            var content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");

            var response = await client.PostAsync("https://api.razorpay.com/v1/orders", content);
            var json = await response.Content.ReadAsStringAsync();

            Console.WriteLine("RAZORPAY RESPONSE: " + json);

            var order = JObject.Parse(json);
            string orderId = order["id"]?.ToString();

            return Ok(new
            {
                orderId = orderId,
                razorpayKey = key,
                amount = request.Amount
            });
        }


        // ==========================
        // VERIFY PAYMENT
        // ==========================
        [HttpPost("verify")]
        public async Task<IActionResult> VerifyPayment([FromBody] PaymentVerifyRequest request)
        {
            var sub = new Subscription
            {
                StudentId = request.StudentId,
                PlanId = request.PlanId,
                Amount = request.Amount,
                RazorpayOrderId = request.RazorpayOrderId,
                RazorpayPaymentId = request.RazorpayPaymentId,
                Status = "ACTIVE",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddMonths(1)
            };

            _db.Subscriptions.Add(sub);
            _db.SaveChanges();

            // ==============================
            // 🔥 NOTIFY SPRING BOOT
            // ==============================
            var springSub = new
            {
                studentId = request.StudentId,
                planId = request.PlanId,
                amount = request.Amount,
                status = "ACTIVE",
                startDate = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ss"),
                endDate = DateTime.Now.AddMonths(1).ToString("yyyy-MM-ddTHH:mm:ss")
            };


            using var client = new HttpClient();
            var json = JsonConvert.SerializeObject(springSub);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            await client.PostAsync("http://localhost:8080/api/subscription/notify", content);

            return Ok(new
            {
                success = true,
                message = "Subscription activated & Spring Boot notified"
            });
        }

    }
}

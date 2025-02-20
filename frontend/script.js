// API base URL
const API_BASE_URL = "https://razorpay-custom-checkout-v2-production.up.railway.app/api";

// Function to toggle between payment methods
function togglePaymentFields() {
    const paymentMethod = document.getElementById('payment_method').value;
    if (paymentMethod === 'card') {
        document.querySelectorAll('.card-payment').forEach(field => field.style.display = 'block');
        document.querySelector('.upi-payment').style.display = 'none';
    } else if (paymentMethod === 'upi') {
        document.querySelector('.upi-payment').style.display = 'block';
        document.querySelectorAll('.card-payment').forEach(field => field.style.display = 'none');
    } else {
        document.querySelectorAll('.card-payment').forEach(field => field.style.display = 'none');
        document.querySelector('.upi-payment').style.display = 'none';
    }
}

// Function to show the modal
function showModal() {
    const modalHTML = `
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 class="text-base font-semibold text-gray-900" id="modal-title">Confirm Your Payment</h3>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500">Are you sure you want to proceed with the payment of ₹74000?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container p-4">
                            <h2 class="text-center text-xl font-semibold text-gray-800 mb-6">Payment Details</h2>
                            <form id="parent-form">
                                <input name="order_id" id="order_id" type="hidden">
                            
                                <!-- Person Name -->
                                <div class="form-group mb-4">
                                    <label for="name" class="block text-sm font-medium text-gray-700">Person Name</label>
                                    <input class="form-control w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                        type="text" placeholder="John MacClain" id="name" required>
                                </div>

                                <!-- Select Payment Method -->
                                <div class="form-group mb-6">
                                    <label for="payment_method" class="block text-sm font-medium text-gray-700">Payment Method</label>
                                    <select class="form-control w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                        id="payment_method" required>
                                        <option value="card">Card</option>
                                        <option value="upi">UPI</option>
                                        <option value="netbanking">Net Banking</option>
                                        <option value="wallet">Wallet</option>
                                    </select>
                                </div>

                                <!-- Card Payment Fields -->
                                <div class="card-payment space-y-4" style="display: block;">
                                    <div class="form-group">
                                        <label for="card_number" class="block text-sm font-medium text-gray-700">Card Number</label>
                                        <input class="form-control w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                            id="card_number" type="text" placeholder="1234 5678 4356 7890" name="card_number" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="card_expiry" class="block text-sm font-medium text-gray-700">Expiry</label>
                                        <input class="form-control w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                            id="card_expiry" type="text" placeholder="MM/YY" name="card_expiry" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="card_cvv" class="block text-sm font-medium text-gray-700">CVV/CVC</label>
                                        <input class="form-control w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                            id="card_cvv" type="password" placeholder="***" name="card_cvv" required>
                                    </div>
                                </div>

                                <!-- UPI Payment Field -->
                                <div class="upi-payment" style="display:none;">
                                    <div class="form-group">
                                        <label for="upi_id" class="block text-sm font-medium text-gray-700">UPI ID</label>
                                        <input class="form-control w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                            id="upi_id" type="text" placeholder="john@upi" required>
                                    </div>
                                </div>
                                <!-- Footer Note -->
                                <p class="footer-note text-center text-sm text-gray-500 mt-4">
                                    Secure payment processing. Your details are safe with us.
                                </p>
                            </form>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto" onclick="payNow()">Pay ₹74000</button>
                            <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" onclick="closeModal()">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    createOrder();

    // Attach the change event to the payment method dropdown after modal is created
    document.getElementById('payment_method').addEventListener('change', togglePaymentFields);

    // Call the toggle function initially to set the correct fields
    togglePaymentFields();
}

// Function to close the modal
function closeModal() {
    const modal = document.querySelector('.relative.z-10');
    if (modal) {
        modal.remove();
    }
}

// Function to create the Razorpay order and set the order_id
async function createOrder() {
    try {
        const response = await fetch(`${API_BASE_URL}/create-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 74000 })
        });
        const order = await response.json();
        document.getElementById('order_id').value = order.id;
    } catch (error) {
        console.error("Error during the payment process:", error);
    }
}

// Function to initiate Razorpay payment
async function payNow() {
    const orderId = document.getElementById('order_id').value;
    const name = document.getElementById('name').value;
    const paymentMethod = document.getElementById('payment_method').value;

    let paymentData = {
        amount: 7400000, // In paise (₹74000)
        currency: "INR",
        email: 'gaurav.kumar@example.com',
        contact: '9123456780',
        notes: { address: 'Ground Floor, SJR Cyber, Laskar Hosur Road, Bengaluru' },
        order_id: orderId, // Order ID generated in the backend
    };

    var razorpay = new Razorpay({ key: "rzp_test_JzKAcHzoOzn4Ol" });

    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('card_number').value;
        const cardExpiry = document.getElementById('card_expiry').value.split('/');
        const cardCvv = document.getElementById('card_cvv').value;

        paymentData.method = 'card';
        paymentData.card = {
            number: cardNumber,
            name: name,
            expiry_month: parseInt(cardExpiry[0]),
            expiry_year: parseInt(cardExpiry[1]),
            cvv: parseInt(cardCvv)
        };
    } else if (paymentMethod === 'upi') {
        const upiId = document.getElementById('upi_id').value;
        paymentData.method = 'upi';
        paymentData.upi = { vpa: upiId };
    } else if (paymentMethod === 'netbanking') {
        paymentData.method = 'netbanking';
    } else if (paymentMethod === 'wallet') {
        paymentData.method = 'wallet';
    }

    razorpay.createPayment(paymentData);

    razorpay.on('payment.success', function (resp) {
        closeModal();
        swal("Success!", "Your payment is successful", "success");
        $.ajax({
            url: '/checkout/pay-verify',
            type: 'POST',
            data: {
                razorpay_payment_id: resp.razorpay_payment_id,
                razorpay_order_id: resp.razorpay_order_id,
                razorpay_signature: resp.razorpay_signature,
            }
        });
    });

    razorpay.on('payment.error', function (resp) {
        swal("Error", "Your payment could not be completed. Please contact support.", "error");
    });
}

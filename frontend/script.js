const API_BASE_URL = "https://razorpay-custom-checkout-v2-production.up.railway.app/api";

// Function to display the modal
function showModal() {
    // Create the modal HTML structure with the payment form
    const modalHTML = `
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        
                        <!-- Modal Header -->
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 class="text-base font-semibold text-gray-900" id="modal-title">
                                        Confirm Your Payment
                                    </h3>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500">
                                            Are you sure you want to proceed with the payment of ₹74000?
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Payment Details Form -->
                        <div class="container p-4">
                            <h2 class="text-center">Payment Details</h2>
                            <form id="parent-form">  
                                <input name="order_id" id="order_id">

                                <!-- Person Name -->
                                <div class="form-group">
                                    <label for="name">Person Name</label>
                                    <input 
                                        class="form-control" 
                                        type="text" 
                                        placeholder="John MacClain" 
                                        id="name" 
                                        required
                                    >
                                </div>

                                <!-- Card Number -->
                                <div class="form-group">
                                    <label for="card_number">Card Number</label>
                                    <input 
                                        class="form-control" 
                                        id="card_number" 
                                        type="text" 
                                        placeholder="1234 5678 4356 7890" 
                                        name="card_number" 
                                        value="5267 3181 8797 5449" 
                                        required
                                    >
                                </div>

                                <!-- Expiry and CVV -->
                                <div class="row">
                                    <div class="col-6 form-group">
                                        <label for="card_expiry">Expiry</label>
                                        <input 
                                            class="form-control" 
                                            id="card_expiry" 
                                            type="text" 
                                            placeholder="MM/YY" 
                                            name="card_expiry" 
                                            required
                                        >
                                    </div>
                                    <div class="col-6 form-group">
                                        <label for="card_cvv">CVV/CVC</label>
                                        <input 
                                            class="form-control" 
                                            id="card_cvv" 
                                            type="password" 
                                            placeholder="***" 
                                            name="card_cvv" 
                                            required
                                        >
                                    </div>
                                </div>

                                <!-- Payment Button -->
                                <button 
                                    type="button" 
                                    class="btn btn-primary" 
                                    onclick="payNow();"
                                >
                                    Pay ₹74000
                                </button>

                                <!-- Footer Note -->
                                <p class="footer-note text-muted">
                                    Secure payment processing. Your details are safe with us.
                                </p>
                            </form>
                        </div>
                        
                        <!-- Modal Footer -->
                        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button 
                                type="button" 
                                class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto" 
                                onclick="payNow()"
                            >
                                Confirm
                            </button>
                            <button 
                                type="button" 
                                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" 
                                onclick="closeModal()"
                            >
                                Cancel
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    `;

    // Insert the modal HTML into the body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Call the function to create the Razorpay order and set the order_id
    createOrder();
}

// Function to close the modal
function closeModal() {
    const modal = document.querySelector('.relative.z-10');
    if (modal) {
        modal.remove();
    }
}

// Function to create Razorpay order and set order_id
async function createOrder() {
    try {
        const response = await fetch(`${API_BASE_URL}/create-order`, {
            method: "POST",
            headers: {"Content-Type" : "application/json" },
            body: JSON.stringify({ amount: 74000 })
        });

        const order = await response.json();
        console.log("Your order is here --->", order);
        
        // Set the order_id in the form input
        document.getElementById('order_id').value = order.id;
    } catch (error) {
        console.error("Error during the payment process:", error);
    }
}

const data = document.getElementById('order_id').value;

console.log("Order Id --->", data )

// Function to initiate Razorpay payment
async function payNow() {
    const orderId = document.getElementById('order_id').value;
    const name = document.getElementById('name').value;
    const cardNumber = document.getElementById('card_number').value;
    const cardExpiry = document.getElementById('card_expiry').value.split('/');
    const cardCvv = document.getElementById('card_cvv').value;

    console.log("Order Id --->", orderId )

    // Razorpay configuration
    var razorpay = new Razorpay({
        key: "rzp_test_JzKAcHzoOzn4Ol",
    });

    var data = {
        amount: 7400000, // In paise (₹74000)
        currency: "INR",
        email: 'gaurav.kumar@example.com',
        contact: '9123456780',
        notes: {
            address: 'Ground Floor, SJR Cyber, Laskar Hosur Road, Bengaluru',
        },
        // order_id: orderId, // Order ID generated in the backend
        method: 'card',
        card: {
            number: cardNumber,
            name: name,
            expiry_month: parseInt(cardExpiry[0]),
            expiry_year: parseInt(cardExpiry[1]),
            cvv: parseInt(cardCvv)
        }
    };

    console.log(data);
    razorpay.createPayment(data);

    razorpay.on('payment.success', function(resp) {
        // Close the modal
        closeModal();

        // Show success alert
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

    razorpay.on('payment.error', function(resp) {
        swal("Error", "Your payment could not be completed. Please contact support.", "error");
    });
}

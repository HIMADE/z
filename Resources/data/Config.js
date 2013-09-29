// get util library
var Util = require('core/Util');

Util.mixin(exports, {
	// Background Color for the Spotlight section
	SPOTLIGHT_BG_COLOR : "#fff",

	// Background Image for the Spotlight section (not required)
	SPOTLIGHT_BG_IMAGE : null,

	// Default thumb image
	PRODUCTS_DEFAULT_THUMB_IMAGE : "<<IMAGE PATH>>",

	// Default main image
	PRODUCTS_DEFAULT_MAIN_IMAGE : "<<IMAGE PATH>>",

	// Default spotlight image
	PRODUCTS_DEFAULT_SPOTLIGHT_IMAGE : "<<IMAGE PATH>>",

	// Info screens (titles & webview urls)
	INFO_SCREENS : [
		{
			TITLE : "About",
			URL   : "<<URL>>"
		},
		{
			TITLE : "Contact",
			URL   : "<<URL>>"
		}
	],

	// URL for product list on server
	PRODUCT_LIST_URL : "http://your-site.com/path/to/file/SampleProducts.js'",

	// PayPal App ID Issued by PayPal
	PAYPAL_APP_ID : "APP-80W284485P519543T",// Use "APP-80W284485P519543T" for sandbox testing,

	// PayPal payment recipient email (so you get paid)
	PAYPAL_RECIPIENT : "wghirakawa-facilitator@hawaii.rr.com",

	// PayPal transaction type (HARD_GOODS, SERVICE or PERSONAL)
	PAYPAL_TRANSACTION_TYPE : "SERVICE",

	// PayPal payment environment (LIVE, SANDBOX or NONE)
	PAYPAL_ENVIRONMENT : "SANDBOX",

	// Whether or not to select/send PayPal shipping information
	PAYPAL_ENABLE_SHIPPING : false,

	// PayPal payment type (Causes the button's text to change from "Pay" to "Donate")
	PAYPAL_PAYMENT_TYPE : "PAY",

	// Your Instant Payment Notification URL. This will be hit by Paypal server on completion of payment.
	PAYPAL_IPN_URL : "",

	// Merchant Name used in PayPal transaction (default to app name)
	MERCHANT_NAME : Ti.App.name,

	// Successful Payment Message
	PAYMENT_SUCCESS_MESSAGE : {
		TITLE   : "Payment successful!",
		MESSAGE : "Thank You for your purchase!"
	}
});
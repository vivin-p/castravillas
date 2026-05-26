/**
 * reCAPTCHA v3 Helper
 */

// Global variable to store the site key
let recaptchaSiteKey = null;

// Initialize recaptcha site key from meta tag or data attribute
function initRecaptchaSiteKey() {
    const metaTag = document.querySelector('meta[name="recaptcha-site-key"]');
    if (metaTag) {
        recaptchaSiteKey = metaTag.getAttribute('content');
    }
}

// Execute reCAPTCHA v3 and get token
async function getRecaptchaResponse() {
    if (typeof grecaptcha === 'undefined') {
        console.warn('reCAPTCHA not loaded');
        return '';
    }
    
    if (!recaptchaSiteKey) {
        // Try to get from window if set from env
        console.warn('reCAPTCHA site key not initialized. Please add meta tag with recaptcha-site-key.');
    }
    
    if (!recaptchaSiteKey) {
        console.warn('reCAPTCHA site key not found');
        return '';
    }

    try {
        const token = await grecaptcha.execute(recaptchaSiteKey, { action: 'submit' });
        return token;
    } catch (error) {
        console.error('reCAPTCHA execution error:', error);
        return '';
    }
}

// Validate reCAPTCHA (for v3, always return true as it's invisible)
function validateRecaptcha() {
    if (typeof grecaptcha === 'undefined') {
        return true; // Skip if not loaded
    }
    return true; // v3 is invisible, so always allow form submission
}

// Function to reset reCAPTCHA (not needed for v3)
function resetRecaptcha() {
    if (typeof grecaptcha !== 'undefined') {
        try {
            grecaptcha.reset();
        } catch (error) {
            console.log('reCAPTCHA reset: ', error);
        }
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initRecaptchaSiteKey);

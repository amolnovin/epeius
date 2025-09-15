/* Modern JavaScript for WP Custom Auth Form */
jQuery(document).ready(function ($) {
    // Toggle OTP and Password forms
    $('#switch-to-otp').click(function (e) {
        e.preventDefault();
        $('#wcaf-password-step1').hide();
        $('#wcaf-otp-step1').fadeIn();
        $('#switch-to-password').fadeIn();
        $(this).hide();
    });

    $('#switch-to-password').click(function (e) {
        e.preventDefault();
        $('#wcaf-otp-step1').hide();
        $('#wcaf-password-step1').fadeIn();
        $('#switch-to-otp').fadeIn();
        $(this).hide();
    });

    // Handle Step 1 Form Submission
    $('#wcaf-auth-step1').on('submit', function (e) {
        e.preventDefault();
        const identifier = $('#wcaf-identifier').val();
        const otp = $('#wcaf-otp-step1').val();
        const password = $('#wcaf-password-step1').val();
        const nonce = wcaf_ajax.nonce;

        $('#wcaf-message').hide();
        $('#wcaf-step1-btn').text('لطفاً صبر کنید...').prop('disabled', true);

        $.ajax({
            url: wcaf_ajax.ajax_url,
            method: 'POST',
            data: {
                action: 'wcaf_step1',
                identifier: identifier,
                otp: otp,
                password: password,
                nonce: nonce
            },
            success: function (response) {
                if (response.status === 'error') {
                    $('#wcaf-message').text(response.msg).fadeIn();
                } else if (response.status === 'login') {
                    window.location.href = response.redirect_url || wcaf_ajax.home_url;
                }
                $('#wcaf-step1-btn').text('ادامه').prop('disabled', false);
            },
            error: function () {
                $('#wcaf-message').text('خطایی رخ داد، لطفاً دوباره تلاش کنید.').fadeIn();
                $('#wcaf-step1-btn').text('ادامه').prop('disabled', false);
            }
        });
    });
});
$(document).ready(function() {
    $('#pokemon_form').bootstrapValidator({        

// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            title: {
                validators: {
                        stringLength: {
                        min: 2,
                        message:'Please enter at least two characters'
                    },
                        notEmpty: {
                        message: 'Please enter the title'
                    }
                }
            },

            status: {
                validators: {
                    notEmpty: {
                        message: 'Please select the status'
                    }
                }
            },
            fakemon: {
                validators: {
                    notEmpty: {
                        message: 'Please select the fakemon'
                    }
                }
            },

            mega_evolution: {
                validators: {
                    notEmpty: {
                        message: 'Please select the mega evolution'
                    }
                }
            },
            first_release: {
                    validators: {
                        notEmpty: {
                            message: 'The date is required'
                        },
                        date: {
                            format: 'DD/MM/YYYY',
                            message: 'The date is not a valid one'
                        }
                    }
                },

            imagepokemon: {
                  validators: {
                      notEmpty: {
                          message: 'Please select an image'
                      },
                      file: {
                          extension: 'jpeg,jpg,png',
                          type: 'image/jpeg,image/png',
                          maxSize: 2097152,   // 2048 * 1024
                          message: 'The selected file is not valid'
                      }
                  }
              }
            }
        })
        .on('success.form.bv', function(e) {
        
           $('#pokemon_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');
            $.post("/validate",
            $form.serialize(),
            function(data,status){
                if (data=="exist"){
                  $('#success_message').html("Pokemon title already exist");
                  $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                }else{
                  $('#success_message').html("Success <i class=\"glyphicon glyphicon-thumbs-up\"></i> Your Pokemon is added successfully.");
                  $('#success_message').slideDown({ opacity: "show" }, "slow"); // Do something ...
                  // Use Ajax to submit form data
                  var form_data = new FormData($('#pokemon_form')[0]);
                  $.ajax({
                     type : 'POST',
                     url : $form.attr('action'),
                     data: form_data,
                     datatype: 'json',
                     contentType: false,
                     processData: false,
                     success: function(data) {

                      }
                   });
                  //$.post($form.attr('action'), $form.serialize(), function(result) {
                      //console.log(result);
                //  }, 'html');
                }

            },'text');
      });
});


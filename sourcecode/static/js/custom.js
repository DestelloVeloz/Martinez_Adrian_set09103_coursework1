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
                 if (data=="exist"){
                   $('#success_message').html("Title already exist");
                 }else if (data=="notexist"){
                   $('#success_message').html("Success <i class=\"glyphicon glyphicon-thumbs-up\"></i> Your Pokemon is added successfully.");
                 }else{
                   $('#success_message').html("This word \""+data+"\" is not allowed, please edit your title");
                 }
                 $('#success_message').slideDown({ opacity: "show" }, "slow"); // Do something ...
                }
             });


        });


        $('#signup_form').bootstrapValidator({
            // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                regusername: {
                    validators: {
                            stringLength: {
                            min: 2,
                            message:'Please enter at least two characters'
                        },
                            notEmpty: {
                            message: 'Please enter the username'
                        }
                    }
                },

                regemail: {
                    validators: {
                        notEmpty: {
                            message: 'Please enter an email address'
                        },
                        emailAddress: {
                          message: 'The value is not a valid email address'
                       }

                    }
                },
                regpassword: {
                    validators: {
                        notEmpty: {
                            message: 'Please choose a password'
                        },
                        identical: {
                        field: 'regconfirmpassword',
                          message: 'The password and confirm password field are different'
                        }

                    }
                },
                regconfirmpassword: {
                    validators: {
                      notEmpty: {
                          message: 'Please choose a confirm password'
                      },
                      identical: {
                      field: 'regpassword',
                      message: 'The password and confirm password field are different'
                      }

                    }
                }


                }
            })

            .on('success.form.bv', function(e) {

                $('#signup_form').data('bootstrapValidator').resetForm();

                // Prevent form submission
                e.preventDefault();

                // Get the form instance
                var $form = $(e.target);

                // Get the BootstrapValidator instance
                var bv = $form.data('bootstrapValidator');

                // Use Ajax to submit form data
                var form_data = new FormData($('#signup_form')[0]);
                $.ajax({
                   type : 'POST',
                   url : $form.attr('action'),
                   data: form_data,
                   datatype: 'json',
                   contentType: false,
                   processData: false,
                   success: function(data) {
                     if (data=="usernameexist"){
                       $('#success_message').html("Username already taken");
                       $('#success_message').slideDown({ opacity: "show" }, "slow"); // Do something ...
                     }else if (data=="emailexist"){
                       $('#success_message').html("Email address already exist");
                       $('#success_message').slideDown({ opacity: "show" }, "slow"); // Do something ...

                     }else{
                       window.location.href="/";
                       

                     }

                    }
                 });


            });


          $('#login_form').bootstrapValidator({
                        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
                        feedbackIcons: {
                            valid: 'glyphicon glyphicon-ok',
                            invalid: 'glyphicon glyphicon-remove',
                            validating: 'glyphicon glyphicon-refresh'
                        },
                        fields: {
                            loginusername: {
                                validators: {

                                        notEmpty: {
                                        message: 'Please enter the username'
                                    }
                                }
                            },


                            loginpassword: {
                                validators: {
                                    notEmpty: {
                                        message: 'Please choose a password'
                                    }


                                }
                            }

                            }
                        })

                        .on('success.form.bv', function(e) {

                            $('#login_form').data('bootstrapValidator').resetForm();

                            // Prevent form submission
                            e.preventDefault();

                            // Get the form instance
                            var $form = $(e.target);

                            // Get the BootstrapValidator instance
                            var bv = $form.data('bootstrapValidator');

                            // Use Ajax to submit form data
                            var form_data = new FormData($('#login_form')[0]);
                            $.ajax({
                               type : 'POST',
                               url : $form.attr('action'),
                               data: form_data,
                               datatype: 'json',
                               contentType: false,
                               processData: false,
                               success: function(data) {
                                 if (data=="incorrect"){
                                   $('#success_message').html("Username or Password is incorrect");
                                   $('#success_message').slideDown({ opacity: "show" }, "slow"); // Do something ...
                                 }else{
                                   window.location.href="/";
                                 }

                                }
                             });


                        })
});


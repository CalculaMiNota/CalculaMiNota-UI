import { environment } from "../../../environments/environment";


declare var $ :any;
export class Validation {

    public signInValidator = null;
    
    public createSignUpValidation(){
        this.signInValidator = $('#signUpForm').validate({
            rules: {
                'emailSignUp': {
                    required: true,
                    email: true,
                    remote: {
                        url: environment.baseUrl + "usuarios/exists?" + $("#emailSignUp").val() ,
                        type : "get",
                        }
                },
                "passwordSignUp": {
                    required: true,
                    minlength: 8,
                },
                "confirmPasswordSignUp": {
                    required: true,
                    equalTo: "#passwordSignUp"
                },
                "terms": {
                    required: true
                }
            },
            messages:{
                'emailSignUp': {
                    required: "El correo electrónico es requerido.",
                    email: "Formato de correo no válido.",
                    remote: "Correo electrónico ya está en uso"
                },
                "passwordSignUp": {
                    required: "La contraseña es requerida.",
                    minlength: "Debe de tener al menos 8 caracteres."
                },
                "confirmPasswordSignUp": {
                    required: "La confirmación de contraseña es requerida.",
                    equalTo: "Las contraseñas no coinciden"
                },
                "terms": {
                    required: "Para poder registrarse es nesecesario aceptar los términos y condiciones de uso."
                }
            },
            highlight: function (input) {
                $(input).parents('.form-line').addClass('error');
                $(input).parents('.form-line').removeClass('success');
            },
            unhighlight: function (input) {
                $(input).parents('.form-line').removeClass('error');
                $(input).parents('.form-line').addClass('success');
            },
            errorPlacement: function (error, element) {
                $(element).parents('.input-group').append(error);
            }
        });
    }

    public validateSingUp(){
        this.signInValidator.resetForm();
        return $("#signUpForm").valid();
    }

}

export class StaticUtilties {
    public static initializeInputs(){
        $.AdminBSB.input = {
            activate: function ($parentSelector) {
                $parentSelector = $parentSelector || $('body');

                //On focus event
                $parentSelector.find('.form-control').focus(function () {
                    $(this).closest('.form-line').addClass('focused');
                });

                //On focusout event
                $parentSelector.find('.form-control').focusout(function () {
                    var $this = $(this);
                    if ($this.parents('.form-group').hasClass('form-float')) {
                        if ($this.val() == '') { $this.parents('.form-line').removeClass('focused'); }
                    }
                    else {
                        $this.parents('.form-line').removeClass('focused');
                    }
                });

                //On label click
                $parentSelector.on('click', '.form-float .form-line .form-label', function () {
                    $(this).parent().find('input').focus();
                });

                //Not blank form
                $parentSelector.find('.form-control').each(function () {
                    if ($(this).val() !== '') {
                        $(this).parents('.form-line').addClass('focused');
                    }
                });
            }
        }
        $.AdminBSB.input.activate();
    }
}

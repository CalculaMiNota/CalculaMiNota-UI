import { environment } from "../../../environments/environment.prod";

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
                    required: "La confirmacion de contraseña es requerida.",
                    equalTo: "Las contraseñas no coinciden"
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

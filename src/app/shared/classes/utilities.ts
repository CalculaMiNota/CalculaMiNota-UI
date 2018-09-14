declare var $ :any;
export class Utilities {

    public static notificarError(message:string, showProgressbar?:boolean ){
        $.notify({
            message: message 
          },{
            type: 'danger',
            showProgressbar: showProgressbar
          });
    }

    public static notificarExito(message:string, showProgressbar:boolean){
        $.notify({
            message: message 
          },{
            type: 'success',
            showProgressbar: showProgressbar
          });
    }


}

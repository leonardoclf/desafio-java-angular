import Swal from 'sweetalert2';

export class SweetAlert {

    static exibirSucesso(msg: string) {
        return Swal.fire(
            'Sucesso!',
            msg,
            'success'
        );
    }


}

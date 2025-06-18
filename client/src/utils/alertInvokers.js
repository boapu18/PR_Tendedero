import Swal from "sweetalert2";

export function successAlert(text, withHtml = false, onConfirm = null) {
    Swal.fire({
        title: "Éxito",
        ...(withHtml ? { html: text } : { text: text }),
        background: "#e6ffe6",
        color: "#121212",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#0FCB06",
        icon: "success",
        customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-button",
        },
    }).then(() => {
        onConfirm?.();
    });
}

export function errorAlert(text, withHtml = false) {
    Swal.fire({
        title: "Error",
        ...(withHtml ? { html: text } : { text: text }),
        background: "#ffe9e5",
        color: "#121212",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#dd2404",
        icon: "error",
        customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-button",
        },
    });
}

export async function confirmationAlert(text, withHtml = false) {
    const result = await Swal.fire({
        title: "Advertencia",
        ...(withHtml ? { html: text } : { text: text }),
        showCancelButton: true,
        background: "#FFFDE5",
        color: "#121212",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#dd2404",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#ABABAB",
        icon: "warning",
        customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-button",
            cancelButton: "custom-swal-button",
        },
    });

    return result.isConfirmed;
}

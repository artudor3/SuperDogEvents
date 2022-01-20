// DISPLAY MESSAGE TO THE USER
function getMessage() {
    let inputMessage = document.getElementById("message").value;
    if (inputMessage != "") {
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your Message was "' + inputMessage + '"'
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Type a message and try again',
            footer: '<a href="">Why do I have this issue?</a>'
        });
    }



    console.log(inputMessage);
    document.getElementById("message").value = "";
    document.getElementById("message").focus();
}
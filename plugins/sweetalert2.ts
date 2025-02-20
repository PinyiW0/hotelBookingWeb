import Swal from 'sweetalert2';

export default defineNuxtPlugin((nuxtApp) => {
  const swal = Swal.mixin({
    width: '550px',
    padding: '4rem',
    confirmButtonColor: '#BF9D7D',
  })
  nuxtApp.provide('swal', swal)
})

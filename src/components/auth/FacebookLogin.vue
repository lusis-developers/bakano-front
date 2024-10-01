<script setup lang="ts">
import useAuthStore from '@/stores/auth.store'
import { onMounted } from 'vue'

const authStore = useAuthStore()

async function initFacebookSDK() {
  try {
    // Inicializar el SDK de Facebook
    console.log('estamos encima del init interno')
    console.log(import.meta.env.VITE_FACEBOOK_ID)
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: import.meta.env.VITE_FACEBOOK_ID, // Reemplaza con tu App ID de Facebook
        cookie: true,
        xfbml: true,
        version: 'v20.0' // Versión de la API
      })
      window.FB.AppEvents.logPageView() // Registro de eventos
    }
    console.log('estamos debajo del init interno')

    // Cargar el SDK de Facebook de manera asincrónica
    ;(function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      const js = d.createElement(s) as HTMLScriptElement
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      if (fjs && fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs)
      }
    })(document, 'script', 'facebook-jssdk')
  } catch (error) {
    console.log(error)
  }
}

// Función para manejar el login con Facebook
function loginWithFacebook() {
  window.FB.getLoginStatus((response: any) => {
    if (response.status === 'connected') {
      statusChangeCallback(response)
    } else {
      window.FB.login(
        (loginResponse: any) => {
          statusChangeCallback(loginResponse)
        },
        {
          scope: 'ads_management,ads_read,pages_read_engagement,business_management'
        }
      )
    }
  })
}

// Callback para manejar el estado del login de Facebook
function statusChangeCallback(response: any) {
  if (response.status === 'connected') {
    const accessToken = response.authResponse.accessToken
    authStore.sendFacebookTokenToBackend(accessToken) // Enviar el token al backend mediante el store
  } else {
    console.log('El usuario no está autenticado con Facebook.')
  }
}

// Ejecutar cuando el componente se monte
onMounted(() => {
  initFacebookSDK()
})
</script>

<template>
  <div>
    <button class="btn btn-primary" @click="loginWithFacebook">Iniciar sesión con Facebook</button>
  </div>
</template>

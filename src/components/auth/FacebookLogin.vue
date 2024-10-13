<script setup lang="ts">
import { onMounted } from 'vue'

import useAuthStore from '@/stores/auth.store'

import { facebookPermissions } from '@/config/components/facebookPermissions.config'

const props = defineProps({
  brandId: {
    type: String,
    required: true
  }
})

const authStore = useAuthStore()

const scope = facebookPermissions.join(',')

async function initFacebookSDK() {
  try {
    // Inicializar el SDK de Facebook
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: import.meta.env.VITE_FACEBOOK_ID,
        cookie: true,
        xfbml: true,
        version: 'v20.0' // Versión de la API DE FACEBOOK
      })
      window.FB.AppEvents.logPageView() // Registro de eventos
    }

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
          scope: scope
        }
      )
    }
  })
}

// Callback para manejar el estado del login de Facebook
function statusChangeCallback(response: any) {
  if (response.status === 'connected') {
    const accessToken = response.authResponse.accessToken
    authStore.sendFacebookTokenToBackend(accessToken, props.brandId) // Enviar el token al backend mediante el store
  } else {
    console.log('El usuario no está autenticado con Facebook.')
  }
}

onMounted(() => {
  initFacebookSDK()
})
</script>

<template>
  <div>
    <button class="btn btn-facebook" @click="loginWithFacebook">
      Conectar con Facebook
      <i class="bi bi-facebook"></i>
    </button>
  </div>
</template>

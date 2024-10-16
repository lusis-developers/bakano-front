<script setup lang="ts">
import { onMounted, ref } from 'vue'

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
const pages = ref<any[]>([])
const selectedPage = ref<string | null>(null)
async function initFacebookSDK() {
  try {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: import.meta.env.VITE_FACEBOOK_ID,
        cookie: true,
        xfbml: true,
        version: 'v20.0'
      })
      window.FB.AppEvents.logPageView()
    }
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
function statusChangeCallback(response: any) {
  if (response.status === 'connected') {
    const accessToken = response.authResponse.accessToken
    window.FB.api(
      '/me/accounts',
      { access_token: accessToken },
      (pagesResponse: any) => {
        if (pagesResponse && !pagesResponse.error) {
          pages.value = pagesResponse.data
        } else {
          console.error('Error al obtener páginas: ', pagesResponse.error)
        }
      }
    )
  } else {
    console.log('El usuario no está autenticado con Facebook.')
  }
}
function sendFacebookData() {
  const selected = pages.value.find((page) => page.id === selectedPage.value)
  if (!selected) {
    console.error('Debes seleccionar una página válida')
    return
  }
  const pageId = selected.id
  const pageAccessToken = selected.access_token
  authStore.sendFacebookTokenToBackend(props.brandId, pageAccessToken, pageId)
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

    <div v-if="pages.length > 0">
      <label for="pages">Selecciona una página:</label>
      <select v-model="selectedPage" id="pages">
        <option disabled value="">Selecciona una página</option>
        <option v-for="page in pages" :key="page.id" :value="page.id">
          {{ page.name }}
        </option>
      </select>
    </div>

    <button
      v-if="selectedPage"
      class="btn btn-primary"
      @click="sendFacebookData"
    >
      Vincular Página Seleccionada
    </button>
  </div>
</template>

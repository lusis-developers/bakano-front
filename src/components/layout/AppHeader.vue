<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useBrandStore } from '@/stores/brand.store'
import { menuOptions } from '@/utils/menuItems.utils'
import DropdownMenu from '@/components/layout/DropdownMenu.vue'

import type { Brand } from '@/interfaces/components/Layout/BrandsTypes.interface'
import type { MenuDropdownItem } from '@/interfaces/components/Layout/MenuDropdownItems.interface'
import CreateBrand from '@/views/Forms/CreateBrand/CreateBrand.vue'
import useUserStore from '@/stores/user.store'
import type { IBrand } from '@/interfaces/Brand/brand.interface'

const userStore = useUserStore()
const brandStore = useBrandStore()

const isCreateBrandModalVisible = ref(false)

function showCreateBrandModal() {
  isCreateBrandModalVisible.value = true
}

function handleBrandSelection(brand: IBrand): void {
  brandStore.setSelectedBrand(brand)
}

function getBrandsAsMenuItems(brands: IBrand[]): MenuDropdownItem[] {
  const brandForMenu = brands.map((brand: IBrand) => ({
    name: brand.name,
    logo: brand.logo,
    link: '#'
  }))
  console.log('brandForMenu: ', brandForMenu)
  return brandForMenu
}
onMounted(async () => {
  await brandStore.getUserBrands(userStore.user?._id as string)
})
</script>

<template>
  <header class="bg-light border-bottom">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <div>
          <slot name="header"></slot>
        </div>
        <div class="d-flex align-items-center gap-3">
          <DropdownMenu
            :menuOptions="menuOptions({ showCreateBrandModal })"
            :menuItems="getBrandsAsMenuItems(brandStore.brands)"
            @item-click="handleBrandSelection"
          >
            <template #button-content>
              <img
                :src="
                  brandStore.selectedBrand?.logo ||
                  'https://i.pinimg.com/236x/22/09/02/220902e0b406bbd28afccd44a3551b1e.jpg'
                "
                :alt="
                  brandStore.selectedBrand?.name ||
                  'https://i.pinimg.com/236x/22/09/02/220902e0b406bbd28afccd44a3551b1e.jpg'
                "
                class="rounded-2"
                style="width: 40px; height: 40px"
              />
              <p class="m-0 d-none d-md-inline">
                {{ brandStore.selectedBrand?.name || 'Seleccionar marca' }}
              </p>
            </template>
            <template #button-icon>
              <i class="bi bi-chevron-compact-down"></i>
            </template>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  </header>
  <CreateBrand :isVisible="isCreateBrandModalVisible" />
</template>

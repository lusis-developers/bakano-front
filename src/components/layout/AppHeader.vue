<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useBrandStore } from '@/stores/brand.store'
import useUserStore from '@/stores/user.store'

import DropdownMenu from '@/components/layout/DropdownMenu.vue'

import { menuOptions } from '@/utils/menuItems.utils'

import CreateBrand from '../app/brand/create/CreateBrand.vue'
import type { IBrand } from '@/interfaces/Brand/brand.interface'
import type { MenuDropdownItem } from '@/interfaces/components/Layout/MenuDropdownItems.interface'

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
    link: '#',
    brand
  }))
  return brandForMenu
}
onMounted(async () => {
  await brandStore.getBrands(userStore.user?._id as string)
})
</script>

<template>
  <header class="bg-light border-bottom">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div
        class="container-fluid d-flex justify-content-between align-items-center"
      >
        <div>
          <slot name="header" />
        </div>
        <div class="d-flex align-items-center gap-3">
          <DropdownMenu
            :menuOptions="menuOptions({ showCreateBrandModal })"
            :menuItems="getBrandsAsMenuItems(brandStore.brands)"
            @item-click="(item) => handleBrandSelection(item.brand)"
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
  <CreateBrand
    :isVisible="isCreateBrandModalVisible"
    @update:is-visible="isCreateBrandModalVisible = $event"
  />
</template>

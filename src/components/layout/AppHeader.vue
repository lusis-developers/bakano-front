<script setup lang="ts">
import { useBrandStore } from '@/stores/brand.store'
import { menuOptions } from '@/utils/menuItems.utils'
import DropdownMenu from '@/components/layout/DropdownMenu.vue'

import type { Brand } from '@/interfaces/components/Layout/BrandsTypes.interface'
import type { MenuDropdownItem } from '@/interfaces/components/Layout/MenuDropdownItems.interface'

const brandStore = useBrandStore()

function handleBrandSelection(brand: Brand): void {
  brandStore.setSelectedBrand(brand)
}

function getMenuItems(brands: Brand[]): MenuDropdownItem[] {
  return brands.map((brand) => ({
    ...brand,
    link: '#'
  }))
}
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
            :menuOptions="menuOptions"
            :menuItems="getMenuItems(brandStore.brands)"
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
</template>

<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <aside
      class="bg-light vh-100 d-flex flex-column p-3 sidebar"
      :class="{ 'sidebar-expanded': isSidebarExpanded }"
    >
      <!-- Logo or Brand -->
      <div class="d-flex align-items-center mb-3">
        <img
          src="../assets/brand/bakano-negro.png"
          alt="Logo"
          class="img-fluid"
          style="max-height: 50px;"
        >
      </div>
      <!-- Menu -->
      <ul class="mt-4 nav nav-pills flex-column">
        <li class="nav-item">
          <a
            class="nav-link active d-flex align-items-center"
            href="#"
          >
            <i class="bi bi-house-door"></i>
            <span v-if="isSidebarExpanded" class="ms-2">Resumen</span>
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link d-flex align-items-center"
            href="#"
          >
            <i class="bi bi-globe"></i>
            <span v-if="isSidebarExpanded" class="ms-2">Web</span>
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link d-flex align-items-center"
            href="#"
          >
            <i class="bi bi-facebook"></i>
            <span v-if="isSidebarExpanded" class="ms-2">Facebook</span>
          </a>
        </li>
        <!-- Add more menu items as needed -->
      </ul>
    </aside>

    <!-- Main Content -->
    <div class="d-flex flex-column flex-grow-1 min-vh-100">
      <!-- Header -->
      <header class="bg-light">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="container-fluid d-flex justify-content-between align-items-center p-3">
            <!-- Toggle button for small screens -->
            <button
              class="btn btn-light d-lg-none"
              type="button"
              @click="toggleSidebar"
            >
              <i class="bi bi-list"></i>
            </button>
            <div>
              <slot name="header"></slot>
            </div>
            <div class="d-flex align-items-center">
              <img
                src="https://i.pinimg.com/236x/22/09/02/220902e0b406bbd28afccd44a3551b1e.jpg"
                alt="Profile picture"
                class="rounded-circle"
                style="width: 40px; height: 40px;"
              >
            </div>
          </div>
        </nav>
      </header>

      <!-- Main -->
      <main class="flex-grow-1">
        <div class="container py-4">
          <!-- Main content -->
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarExpanded: false,
    };
  },
  mounted() {
    this.updateSidebarState();
    window.addEventListener('resize', this.updateSidebarState);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateSidebarState);
  },
  methods: {
    updateSidebarState() {
      this.isSidebarExpanded = window.innerWidth >= 992; // 'lg' breakpoint in Bootstrap
    },
    toggleSidebar() {
      this.isSidebarExpanded = !this.isSidebarExpanded;
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 80px;
  transition: width 0.3s;
}
.sidebar-expanded {
  width: 250px;
}
.sidebar .nav-link {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
}
.sidebar-expanded .nav-link {
  justify-content: flex-start;
}
.sidebar .nav-link span {
  display: none;
}
.sidebar-expanded .nav-link span {
  display: inline;
}
</style>

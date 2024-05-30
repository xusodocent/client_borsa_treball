<script>
import SidebarLink from './SidebarLink'
import { collapsed, toggleSidebar, sidebarWidth } from './state'
export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  }
}
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <div>G</div>
        <div>B</div>
      </span>
      <span v-else>Gestió Borsa</span>
    </h1>

    <SidebarLink to="/login" icon="fa-regular fa-user">Login/Logout</SidebarLink>
    <SidebarLink to="/" icon="fas fa-home">Inici</SidebarLink>
    <SidebarLink to="/empreses" icon="fa-solid fa-industry">Empreses</SidebarLink>
    <SidebarLink to="/contactes" icon="fa-regular fa-address-book">Contactes</SidebarLink>
    <SidebarLink to="/sectors" icon="fa-solid fa-person-digging">Sectors</SidebarLink>
    <SidebarLink to="/cicles" icon="fa-regular fa-rectangle-list">Cicles</SidebarLink>
    <SidebarLink to="/alumnes" icon="fa-solid fa-graduation-cap">Alumnat</SidebarLink>
    <SidebarLink to="/ofertes" icon="fa-solid fa-list">Ofertes</SidebarLink>
 
    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #500af3;
  --sidebar-item-hover: #509adf;
  --sidebar-item-active: #220b85;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
}
.sidebar h1 {
  height: 2.5em;
}
.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
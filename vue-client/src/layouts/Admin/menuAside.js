import { mdiMonitor, mdiTable } from "@mdi/js";

export default [
  {
    to: "/admin",
    icon: mdiMonitor,
    label: "Dashboard",
  },
  {
    to: "/admin/user",
    label: "Users",
    icon: mdiTable,
  },
  {
    to: "/admin/story",
    label: "Stories",
    icon: mdiTable,
  },
];

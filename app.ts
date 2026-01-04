import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widget/Bar"
import AppLauncher from "./widget/AppLauncher/AppLauncher"

app.start({
  css: style,
  main() {
    app.get_monitors().map(monitor => {
      Bar(monitor);
      AppLauncher({gdkmonitor: monitor});
    })
  },
})

import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widget/Bar"
import AppLauncher from "./widget/AppLauncher"

app.start({
  css: style,
  main() {
    app.get_monitors().map(monitor => {
      Bar(monitor);

      const appLauncher = app.get_window("AppLauncher");
      AppLauncher({gdkmonitor: monitor, visible: false});

      if(appLauncher){
        appLauncher.visible = true;
      }
    })
  },
})

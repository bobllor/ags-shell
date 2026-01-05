import { Gtk } from "ags/gtk4";
import { Accessor, Setter } from "gnim";

export function Search({setEntry, setTextVal}: Props): JSX.Element{
    return (
        <box>
            <entry
            $={ref => setEntry(ref)}
            onNotifyText={({ text }) => setTextVal(text)}
            class="app-search" 
            canFocus={false}
            canTarget={false} />
        </box>
    )
}

type Props = {
    setEntry: Setter<Gtk.Entry>,
    setTextVal: Setter<string>,
}
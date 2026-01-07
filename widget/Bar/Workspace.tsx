import Hyprland from "gi://AstalHyprland";
import { Accessor, createBinding } from "gnim";


export default function Workspace({workspaceAmount}: Props): JSX.Element{
    // i tried adding this in the class but it does not work.
    // i will have to probe the discord to see if it's possible, for now
    // i'm passing the state as a prop into the class.
    const ws: Workspaces = new Workspaces(workspaceAmount);

    return (
        <box
        class="workspaces"
        $type="center">
            {ws.getWorkspaceButtons().map(button => (
                button
            ))}
        </box>
    )
}

class Workspaces{
    private hypr: Hyprland.Hyprland = Hyprland.get_default();
    private workspaces: Array<number> = [];

    private currWsID: number = -1;

    constructor(wsCount: number = 5){
        this.workspaces = [...Array(wsCount).keys()].map(count => count + 1);
    }
    
    getWorkspaceButtons(): Array<JSX.Element>{ 
        const buttons: Array<JSX.Element> = [];

        for(const num of this.workspaces){
            buttons.push(
                <button
                canShrink
                class={createBinding(this.hypr, "focusedWorkspace").as(ws => {
                    return ws.id == num ? "is-focused" : "";
                })}
                onClicked={() => {
                    if(this.currWsID == num){
                        return;
                    }

                    this.currWsID = num;
                    this.hypr.dispatch("workspace", num.toString());
                }} />
            )
        }

        return buttons;
    }
}

type Props = {
    workspaceAmount: number,
};
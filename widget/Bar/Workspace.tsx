import { State } from "ags";
import Hyprland from "gi://AstalHyprland";
import { Accessor, createBinding, createComputed, createEffect, createState, Setter } from "gnim";

export default function Workspace({count}: WorkspaceProps): JSX.Element{
    // i tried adding this in the class but it does not work.
    // i will have to probe the discord to see if it's possible, for now
    // i'm passing the state as a prop into the class.
    const [wsID, setWsID]: State<number> = createState(-1);
    const ws: Workspaces = new Workspaces(count, {wsId: wsID, setWsId: setWsID});

    ws.useWorkspaceHook();

    return (
        <box
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

    wsState: WorkspaceState;

    constructor(wsCount: number, wsStateProps: WorkspaceState){
        this.workspaces = [...Array(wsCount).keys()].map(count => count + 1);

        this.wsState = wsStateProps;

        if(this.wsState.wsId.peek() < 0){
            this.wsState.setWsId(this.hypr.focusedWorkspace.get_id());
        }
    }
    
    getWorkspaceButtons(): Array<JSX.Element>{ 
        const buttons: Array<JSX.Element> = [];

        for(const num of this.workspaces){
            buttons.push(
                <button 
                onClicked={() => {
                    this.wsState.setWsId(num);
                    this.hypr.dispatch("workspace", num.toString());
                }}>
                    {num}
                </button>
            )
        }

        return buttons;
    }

    // NOTE: this is a test hook and not meant to be used in final.
    // this is just used to test out side effects
    useWorkspaceHook(){
        createEffect(() => {
            console.log(this.wsState.wsId());
        })
    }
}

type WorkspaceProps = {
    count: number,
};

type WorkspaceState = {
    wsId: Accessor<number>,
    setWsId: Setter<number>,
};
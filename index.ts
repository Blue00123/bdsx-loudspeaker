import { CustomForm, Form, FormLabel } from "bdsx/bds/form";
import { command } from "bdsx/command";
import { bedrockServer } from "bdsx/launcher";

let blue: any = {}
command.register('확성기', '모두에게 메세지를 보냅니다.').overload(async(param, origin, output)=>{
    const actor = origin.getEntity();
    if (actor === null) {
        console.log("콘솔에서 본 명령어를 사용하지 못합니다.")
        return;
    }
    const ni = actor.getNetworkIdentifier();
        const res = await Form.sendTo(ni, {
            type: 'custom_form',
            title: '§d§l[ §f확성기 §d]',
            content: [
                {
                    type: 'input',
                    text: '§l§7작성할 채팅을 입력하세요!',
                    placeholder: '§l§f여기에 입력해주세요.',
                }
            ]
        });
        if (res === null) return;
        if (res[0].length < 30) {
        blue[actor.getName()] = res[0];
        bedrockServer.executeCommand(`playsound random.levelup @a[name="${actor.getName()}"]`);
        bedrockServer.executeCommand(`tellraw @a {"rawtext":[{"text":"--------------\n--------------\n------------- \n§d§l[ §f확성기 §d] §r${actor.getName()} => ${res[0]} \n-------------\n--------------\n--------------"}]}`);
        } else {
            bedrockServer.executeCommand(`playsound random.break @a[name="${actor.getName()}"]`);
       bedrockServer.executeCommand(`tellraw @a[name="${actor.getName()}"] {"rawtext":[{"text":"§l§d[ §f확성기 §d] §c§l글자가 너무 깁니다! 30자 미만으로 써주세요."}]}`);
        }
    },{});

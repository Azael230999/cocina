import * as THREE from "three";
import {WallCabinet} from "../kitchen/WallCabinet.js";

const MOUNT_HEIGHT=2.10;

export function makeWallCabinetProp(materials){

    const cabinet=new WallCabinet(materials);

    cabinet.group.position.y=MOUNT_HEIGHT;

    const wrapper=new THREE.Group();

    wrapper.add(cabinet.group);

    wrapper.userData.selectable=true;

    wrapper.userData.movable=true;

    wrapper.userData.kind="cabinet";

    wrapper.userData.label="Gabinete alto";

    return {group:wrapper};

}

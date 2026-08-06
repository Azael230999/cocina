import { SceneManager } from "./core/SceneManager.js";
import { Room } from "./kitchen/Room.js";

const container = document.getElementById("app");

const sceneManager = new SceneManager(container);

const room = new Room();

sceneManager.add(room.group);

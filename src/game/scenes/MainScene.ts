import Phaser from "phaser";
import { createCharacterSprite, createWorldTiles } from "../utils/graphics";

export class MainScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private speed: number = 150;

  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    // We'll create graphics programmatically
  }

  create() {
    // Create world tiles
    createWorldTiles(this);

    // Create player character
    this.player = this.physics.add.sprite(400, 300, "player");
    createCharacterSprite(this, this.player);
    
    // Set player properties
    this.player.setCollideWorldBounds(true);
    
    // Create animations
    this.createAnimations();
    
    // Set up camera to follow player
    this.cameras.main.setBounds(0, 0, 800, 600);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    
    // Set up keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (!this.cursors || !this.player) return;

    // Reset velocity
    this.player.setVelocity(0);

    // Handle movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-this.speed);
      this.player.anims.play("walk-left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(this.speed);
      this.player.anims.play("walk-right", true);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-this.speed);
      if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
        this.player.anims.play("walk-up", true);
      }
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(this.speed);
      if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
        this.player.anims.play("walk-down", true);
      }
    }

    // Idle animation if not moving
    if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
      this.player.anims.play("idle", true);
    }
  }

  private createAnimations() {
    // Create player animations
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("player", { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("player", { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers("player", { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1
    });
  }
}

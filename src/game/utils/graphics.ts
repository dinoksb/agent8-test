import Phaser from "phaser";

// Create character sprite programmatically
export function createCharacterSprite(scene: Phaser.Scene, sprite: Phaser.GameObjects.Sprite) {
  // Create a texture for the player if it doesn't exist
  if (!scene.textures.exists("player")) {
    const graphics = scene.make.graphics({ x: 0, y: 0 });
    
    // Create character frames (16 frames: 4 directions x 4 frames each)
    const frameWidth = 32;
    const frameHeight = 32;
    const colors = {
      body: 0x3498db,
      face: 0xecf0f1,
      hair: 0x2c3e50,
      outfit: 0x2980b9
    };
    
    // Create frames for all animations (down, left, right, up)
    for (let i = 0; i < 16; i++) {
      graphics.clear();
      
      // Determine which direction this frame is for
      const direction = Math.floor(i / 4);
      const frameInDirection = i % 4;
      
      // Body
      graphics.fillStyle(colors.body);
      graphics.fillRect(8, 8, 16, 20);
      
      // Face
      graphics.fillStyle(colors.face);
      graphics.fillRect(10, 10, 12, 8);
      
      // Hair
      graphics.fillStyle(colors.hair);
      graphics.fillRect(8, 6, 16, 4);
      
      // Eyes
      graphics.fillStyle(0x000000);
      
      // Different eye positions based on direction
      if (direction === 0) { // Down
        graphics.fillRect(12, 12, 2, 2);
        graphics.fillRect(18, 12, 2, 2);
      } else if (direction === 1) { // Left
        graphics.fillRect(10, 12, 2, 2);
      } else if (direction === 2) { // Right
        graphics.fillRect(20, 12, 2, 2);
      } else if (direction === 3) { // Up
        // No eyes visible when looking up
      }
      
      // Outfit
      graphics.fillStyle(colors.outfit);
      graphics.fillRect(8, 18, 16, 10);
      
      // Arms
      const armOffset = Math.sin((frameInDirection / 3) * Math.PI) * 4;
      
      if (direction === 1) { // Left
        graphics.fillStyle(colors.body);
        graphics.fillRect(4, 14 + armOffset, 4, 4);
      } else if (direction === 2) { // Right
        graphics.fillStyle(colors.body);
        graphics.fillRect(24, 14 + armOffset, 4, 4);
      } else {
        // For up/down, show both arms with slight animation
        graphics.fillStyle(colors.body);
        graphics.fillRect(4, 14 + (direction === 0 ? armOffset : -armOffset), 4, 4);
        graphics.fillRect(24, 14 + (direction === 0 ? -armOffset : armOffset), 4, 4);
      }
      
      // Legs with walking animation
      graphics.fillStyle(0x34495e);
      if (frameInDirection % 2 === 0) {
        graphics.fillRect(10, 28, 4, 4);
        graphics.fillRect(18, 28, 4, 4);
      } else {
        graphics.fillRect(12, 28, 4, 4);
        graphics.fillRect(16, 28, 4, 4);
      }
      
      // Generate frame
      graphics.generateTexture("player", 16 * frameWidth, frameHeight);
      
      // Cut out the specific frame
      scene.textures.get("player").add(
        i, 
        0, 
        i * frameWidth, 
        0, 
        frameWidth, 
        frameHeight
      );
    }
    
    // Clean up the graphics object
    graphics.destroy();
  }
  
  // Set the sprite's texture to our generated one
  sprite.setTexture("player");
  sprite.setFrame(0);
}

// Create world tiles programmatically
export function createWorldTiles(scene: Phaser.Scene) {
  // Create a texture for the grass if it doesn't exist
  if (!scene.textures.exists("grass")) {
    const graphics = scene.make.graphics({ x: 0, y: 0 });
    
    // Base grass color
    graphics.fillStyle(0x2ecc71);
    graphics.fillRect(0, 0, 32, 32);
    
    // Add some variation to the grass
    graphics.fillStyle(0x27ae60);
    
    // Random grass pattern
    for (let i = 0; i < 10; i++) {
      const x = Phaser.Math.Between(0, 28);
      const y = Phaser.Math.Between(0, 28);
      const size = Phaser.Math.Between(2, 4);
      graphics.fillRect(x, y, size, size);
    }
    
    graphics.generateTexture("grass", 32, 32);
    graphics.destroy();
  }
  
  // Create a texture for the path if it doesn't exist
  if (!scene.textures.exists("path")) {
    const graphics = scene.make.graphics({ x: 0, y: 0 });
    
    // Base path color
    graphics.fillStyle(0xd35400);
    graphics.fillRect(0, 0, 32, 32);
    
    // Add some variation to the path
    graphics.fillStyle(0xe67e22);
    
    // Random path pattern
    for (let i = 0; i < 8; i++) {
      const x = Phaser.Math.Between(0, 28);
      const y = Phaser.Math.Between(0, 28);
      const size = Phaser.Math.Between(2, 4);
      graphics.fillRect(x, y, size, size);
    }
    
    graphics.generateTexture("path", 32, 32);
    graphics.destroy();
  }
  
  // Create a texture for trees if it doesn't exist
  if (!scene.textures.exists("tree")) {
    const graphics = scene.make.graphics({ x: 0, y: 0 });
    
    // Tree trunk
    graphics.fillStyle(0x8B4513);
    graphics.fillRect(14, 20, 8, 12);
    
    // Tree leaves
    graphics.fillStyle(0x196F3D);
    graphics.fillCircle(18, 14, 12);
    graphics.fillStyle(0x229954);
    graphics.fillCircle(18, 14, 8);
    
    graphics.generateTexture("tree", 36, 36);
    graphics.destroy();
  }
  
  // Create a simple world with grass and some paths
  for (let y = 0; y < 600; y += 32) {
    for (let x = 0; x < 800; x += 32) {
      // Mostly grass with some paths
      const tile = scene.add.image(x + 16, y + 16, 
        Math.random() > 0.9 ? "path" : "grass");
      tile.setDisplaySize(32, 32);
    }
  }
  
  // Add some trees around the edges
  for (let i = 0; i < 20; i++) {
    const x = Phaser.Math.Between(50, 750);
    const y = Phaser.Math.Between(50, 550);
    
    // Don't place trees in the center area
    if (x > 300 && x < 500 && y > 200 && y < 400) continue;
    
    scene.add.image(x, y, "tree").setDisplaySize(64, 64);
  }
}

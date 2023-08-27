**Serde - Rust序列化与反序列化库**

```rust
use serde::{Serialize, Deserialize};
use serde_json;

#[derive(Serialize, Deserialize)]
struct GameInfo {
    player_name: String,
    score: u32,
    level: u8,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let game_data = GameInfo {
        player_name: "Player123".to_string(),
        score: 100,
        level: 5,
    };

    // 序列化
    let serialized = serde_json::to_string(&game_data)?;
    // 保存为文件
    std::fs::write("game_data.json", serialized)?;

    // 读取文件
    let loaded_data = std::fs::read_to_string("game_data.json")?;
    // 反序列化
    let deserialized: GameInfo = serde_json::from_str(&loaded_data)?;

    println!("Loaded game info: {:?}", deserialized);

    Ok(())
}
```

*最后更新: 2023-08-27*
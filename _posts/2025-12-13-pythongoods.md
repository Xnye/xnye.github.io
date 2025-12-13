---
layout: mypost
title: Python语法基础复习
categories: [Python]
---

### 数据类型

#### 布尔

`bool('0')`的值是`1`

`bool([])`的值是`0`

#### 进制

二进制的前缀`0b`，用`bin()`转

八进制的前缀`0o`，用`oct()`转

十六进制的前缀`0x`，用`hex()`转

转回十进制，`int(string, base)`，string填待转数字的字符串形式，base填进制数字。例：`int('1010', 2)` → `10`

#### 字符串

`r'...'`表示内部不启用`\`转义符，如表示文件路径时需要保留`\`符号

`f'...'`允许在字符串中嵌入表达式，如`f'2+3={2+3}'` → `2+3=5`

`ord('A')` → `65`，`ord('中')` → `20013`，

`chr(66)` → `'B'`，`chr(25991)` → `'文'`

### 循环

while-else 循环中，`condition==false`时，else中的代码会被运行，然后跳出循环。**执行`break`不会运行else中的代码**

```python
while condition:
    ...
else:
    ... # 只有在condition为false时执行
```


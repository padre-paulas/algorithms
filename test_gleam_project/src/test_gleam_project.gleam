import gleam/io
// import gleam/string as text

pub fn main() -> Nil {
  io.println("Hello from test_gleam_project!")
  say_name("Hello")
}

pub fn say_name(word: String) -> Nil {
  io.println(word)
}
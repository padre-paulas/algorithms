import gleam/io
import gleam/string as text

pub fn main() {
  io.println("Hello, world!")
  io.println(text.reverse("Hello, world!"))
}
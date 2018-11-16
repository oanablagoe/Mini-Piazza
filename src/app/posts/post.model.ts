export class Post {
  public title: string;
  public description: string;
  public author: string;
  public date: string;

  constructor(name: string, desc: string, author: string, date: string) {
    this.title = name;
    this.description = desc;
    this.author = author;
    this.date = date;
  }
}

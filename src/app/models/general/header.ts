export interface Header {
  title: string;
  text: string;
}

export function HeaderInitializer(){
  return new class implements Header {
      title: string = "";
      text: string = "";
  }
}

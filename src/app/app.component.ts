import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'method-raid-tools';
  input: FormControl;

  constructor() {
    this.input = new FormControl()
  }

  private static parseNoteCode(val: string) {
    const i = val.split(' ');
    i.map( (block, idx) => {
      if (block.startsWith('|cff')) {
        const playerName = this.findPlayerName(block);
        if (playerName.toLowerCase() !== 'everyone') {
          this.addERTTags(playerName, block, i, idx);
        }
      }
      return block;
    })
    return i.join(' ');
  }

  private static addERTTags(playerName: string, block: string, i: string[], idx: number) {
    const v = `{p:${playerName}\}${block} ${i[idx + 1].trim()}{/p}`
    i.splice(idx + 1, 1)
    i[idx] = v;
  }

  private static findPlayerName(str: string) {
    return str.substring(10).slice(0, -2)
  }

  convertClick() {
    this.input.patchValue(AppComponent.parseNoteCode(this.input.value))
  }
}

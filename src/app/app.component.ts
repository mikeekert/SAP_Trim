import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'methodRaidTools';
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
          const v = `{p:${playerName}\}${block} ${i[idx + 1].trim()}{/p}`
          i.splice(idx + 1, 1)
          i[idx] = v;
        }
      }
      return block;
    })
    return i.join(' ');
  }

  private static findPlayerName(str: string) {
    return str.substring(10).slice(0, -2)
  }

  convertClick() {
    this.input.patchValue(AppComponent.parseNoteCode(this.input.value))
  }
}

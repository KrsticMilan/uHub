import { Component, ViewChild, ElementRef } from '@angular/core';
import { DataService } from './services/data.service';
import { Data, Item } from './models/data.module';
import * as _ from 'lodash';
import Packer from './packer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'Grill Master';
  data: Data[] = [];
  selectedMenu: Data = null;

  //Grill
  grillLength: number = 20;
  grillWidth: number = 30;
  grillSurfaceArea: number = this.grillLength * this.grillWidth;

  //Canvas
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  canvasWidth: number = this.grillWidth * 10;
  canvasHeight: number = this.grillLength * 10;

  //Rounds
  rounds: any[] = [];
  totalRounds = 0;
  selectedRound: number = 0;
  currentRound: number = this.selectedRound + 1;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.canvas.nativeElement.width = this.canvasWidth;
    this.canvas.nativeElement.height = this.canvasHeight;

    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.dataService.fetchData().subscribe((data: any) => {
      this.data = data;
      console.log(this.data);
    });
  }

  onSelectMenu(selectedMenu) {
    this.selectedRound = 0;
    this.currentRound = 1;
    const selectedMenuIndex: number = _.findIndex(this.data, [
      'menu',
      selectedMenu.value,
    ]);

    this.selectedMenu = this.data[selectedMenuIndex];
    this.calculateRounds();
  }

  findFitItems(items: any[]) {
    return items.filter((item) => {
      if (item.hasOwnProperty('fit')) {
        return item;
      }
    });
  }

  calculateRounds() {
    let pck = new Packer(this.grillWidth, this.grillLength);
    let totalItemsSurfaceArea = 0;
    let flatList = [];

    this.selectedMenu.items.forEach((item) => {
      totalItemsSurfaceArea += item.Length * item.Width * item.Quantity;

      for (let index = 0; index < item.Quantity; index++) {
        flatList.push({ w: item.Width, h: item.Length, name: item.Name });
      }
    });

    this.totalRounds = Math.ceil(totalItemsSurfaceArea / this.grillSurfaceArea);

    let rounds = [];
    let tempNotFitItems = [];

    pck.fit(flatList);

    let fitItems = this.findFitItems(flatList);

    for (let x = 0; x < this.totalRounds; x++) {
      if (tempNotFitItems.length > 0) {
        pck.fit(tempNotFitItems, true);

        flatList = tempNotFitItems;
        fitItems = this.findFitItems(tempNotFitItems);
      }

      tempNotFitItems = _.difference(flatList, fitItems);

      rounds.push({
        fit: fitItems,
        name: `Round ${x + 1}`,
      });

      if (x === this.totalRounds - 1 && tempNotFitItems.length > 0)
        this.totalRounds++;
    }
    this.rounds = rounds;

    let selectedRound = this.rounds[this.selectedRound];

    this.clearCanvas();
    this.drawLayout(selectedRound.fit);
  }

  onRoundChange(step) {
    if (
      this.selectedRound + step < 0 ||
      this.selectedRound + step >= this.rounds.length
    )
      return;
    this.selectedRound = this.selectedRound + step;
    this.currentRound = this.selectedRound + 1;
    let selectedRound = this.rounds[this.selectedRound];

    this.clearCanvas();
    this.drawLayout(selectedRound.fit);
  }

  drawLayout(currentRound: any[]) {
    currentRound.forEach((item) => {
      this.ctx.beginPath();
      this.ctx.rect(item.fit.x * 10, item.fit.y * 10, item.w * 10, item.h * 10);
      this.ctx.fillStyle = this.getRandomColor();
      this.ctx.fill();
      this.ctx.stroke();
    });
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

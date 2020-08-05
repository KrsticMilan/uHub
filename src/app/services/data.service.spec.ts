import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { DataService } from './data.service';

let service: DataService;
let httpMock: HttpTestingController;

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    service = TestBed.get(DataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrive posts from the API', () => {
    const dummyData = [
      {
        $id: '1',
        id: '99a08d4b-8e20-4811-beee-1b56ac545f90',
        menu: 'Menu 04',
        items: [
          {
            $id: '2',
            id: '90ed4d57-7921-4c66-b208-4e312a9852e6',
            Name: 'Paprika Sausage',
            Length: 6,
            Width: 3,
            Duration: '00:08:00',
            Quantity: 40,
          },
          {
            $id: '3',
            id: '47614f4d-2621-40de-8be7-e35abed8ed44',
            Name: 'Veal',
            Length: 8,
            Width: 4,
            Duration: '00:08:00',
            Quantity: 10,
          },
        ],
      },
      {
        $id: '4',
        Id: '0b93c91f-7315-47dd-a1ad-1df4876752f7',
        menu: 'Menu 11',
        items: [
          {
            $id: '5',
            id: '5e600aad-5bcf-4739-8272-0bf14f9cc8f1',
            Name: 'Rumpsteak',
            Length: 15,
            Width: 7,
            Duration: '00:08:00',
            Quantity: 2,
          },
          {
            $id: '6',
            id: '90ed4d57-7921-4c66-b208-4e312a9852e6',
            Name: 'Paprika Sausage',
            Length: 6,
            Width: 3,
            Duration: '00:08:00',
            Quantity: 5,
          },
          {
            $id: '7',
            id: '7573428d-7375-4801-bef3-fe4d0d6bc3b9',
            Name: 'Chipolata Sausage',
            Length: 5,
            Width: 2,
            Duration: '00:08:00',
            Quantity: 4,
          },
          {
            $id: '8',
            id: 'cb14206e-495f-4e41-b78e-d4c074b07f1e',
            Name: 'Steak',
            Length: 10,
            Width: 5,
            Duration: '00:08:00',
            Quantity: 2,
          },
        ],
      },
      {
        $id: '9',
        Id: '3fbc6694-3a5a-4e70-853e-3b7a67d0ab42',
        menu: 'Menu 03',
        items: [
          {
            $id: '10',
            id: '7573428d-7375-4801-bef3-fe4d0d6bc3b9',
            Name: 'Chipolata Sausage',
            Length: 5,
            Width: 2,
            Duration: '00:08:00',
            Quantity: 12,
          },
          {
            $id: '11',
            id: '90ed4d57-7921-4c66-b208-4e312a9852e6',
            Name: 'Paprika Sausage',
            Length: 6,
            Width: 3,
            Duration: '00:08:00',
            Quantity: 12,
          },
          {
            $id: '12',
            id: '1f399e24-7c20-4f18-afb5-3a748cc79ce0',
            Name: 'Chicken',
            Length: 12,
            Width: 5,
            Duration: '00:08:00',
            Quantity: 12,
          },
          {
            $id: '13',
            id: 'cb14206e-495f-4e41-b78e-d4c074b07f1e',
            Name: 'Steak',
            Length: 10,
            Width: 5,
            Duration: '00:08:00',
            Quantity: 12,
          },
        ],
      },
    ];

    service.fetchData().subscribe((menues) => {
      expect(menues.length).toBe(3);
    });
    const request = httpMock.expectOne(`${service.ROOT_URL}/api/GrillMenu`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyData);
  });
});

import { Component } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-populate',
  templateUrl: './populate.component.html',
  styleUrls: ['./populate.component.css']
})
export class PopulateComponent {
  
  files:File[] = [];

  constructor(private service: ForecastService, private toastr: ToastrService) {}

  hasUpload(event:any){
    this.files.push(event.target.files[0]);
  }

  uploadFiles() {
    const formData = new FormData();

    if(this.files.length == 0) {
      this.toastr.error('Select file first!');
      return;
    }

    this.files.forEach(file => {
      console.log(file);
      
      formData.append('file', <File>file, file.name);
    });

    this.service.uploadFiles(formData).subscribe({
      next: (data) => {
        this.toastr.success('File upload successfull.');
      },
      error: (error) => {
        this.toastr.error('Error!');
      }
    });
  }
}

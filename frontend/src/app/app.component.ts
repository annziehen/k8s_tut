import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  serverStatus: 'checking' | 'accessible' | 'not-accessible' = 'checking';

  async ngOnInit() {
    try {
      const res = await fetch('http://localhost:8080/status');
      if (res.ok) {
        const body = await res.json();
        if (body.status === 'running') {
          this.serverStatus = 'accessible';
          return;
        }
      }
      this.serverStatus = 'not-accessible';
    } catch (e) {
      this.serverStatus = 'not-accessible';
    }
  }
}

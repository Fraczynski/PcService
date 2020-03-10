import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Directive({
  selector: '[appNoHasRole]'
})
export class NoHasRoleDirective implements OnInit {
  @Input() appNoHasRole: string[];
  isVisible = false;

  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>,
    private authService: AuthService) { }

  ngOnInit(): void {
    const userRoles = this.authService.decodedToken.role as Array<string>;
    if (!userRoles) {
      this.viewContainerRef.clear();
    }
    if (!this.authService.roleMatch(this.appNoHasRole)) {
      if (!this.isVisible) {
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    }
  }

}

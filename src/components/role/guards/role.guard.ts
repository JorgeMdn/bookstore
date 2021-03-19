import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// nos ayuda a determinar cuales son las dependencias, a decifrar los valores de las dependencias en tiempo de ejecion
import { Reflector } from "@nestjs/core"; 

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly _reflactor: Reflector
  ){

  }
  canActivate(
    context: ExecutionContext,
  ): boolean {
    // aqui se almacenan los roles que allan sido pasados en nuestro decorador
    const roles: string[] = this._reflactor.get<string[]>('roles',context.getHandler())
    
    // si no existe ningun role dejamos que siga el flujo de la peticion
    if(!roles){
      return true
    }

    // obtenemos el objeto request
    const request = context.switchToHttp().getRequest()
    const { user } = request

    // verificamos dentro del array de roles el nombre del role que necesitamos
    const hasRole = () => user.roles.some((role: string) => {roles.includes(role)})

    /**
     * 
     *  debe de existir el usuariom debe de existir la propiedad de roles y 
     * debe de tener alguno de los roles que necesitamos en nuestro decorador 
     * 
     * */
    return user && user.roles && hasRole() 


  }
}

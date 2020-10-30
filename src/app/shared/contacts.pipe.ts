import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact';
import * as _ from 'underscore';


@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], filter: string=''): any {
    let result = contacts || [];
    
    if(filter && filter.trim()){      
        result = result.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);;
      }    

    return result;
  }
}
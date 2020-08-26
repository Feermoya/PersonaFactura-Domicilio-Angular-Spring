package com.Parcial2Cortez.app.DetalleFactura;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.Parcial2Cortez.app.Common.CommonController;


@RestController
@CrossOrigin(origins = "*",
methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
@RequestMapping(path = "api/detalle_factura")
public class DetalleFacturaController extends CommonController<DetalleFacturaEntity, DetalleFacturaService>{

}

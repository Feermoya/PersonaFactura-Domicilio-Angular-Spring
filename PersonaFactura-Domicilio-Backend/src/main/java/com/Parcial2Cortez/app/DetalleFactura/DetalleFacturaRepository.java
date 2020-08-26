package com.Parcial2Cortez.app.DetalleFactura;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;




@Repository
public interface DetalleFacturaRepository extends JpaRepository<DetalleFacturaEntity, Long>{

}
package com.Parcial2Cortez.app.Factura;

import java.io.Serializable;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.Parcial2Cortez.app.Common.CommonEntity;
import com.Parcial2Cortez.app.DetalleFactura.DetalleFacturaEntity;



@Entity
@Table(name = "cabeza_factura")
public class FacturaEntity extends CommonEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	private String tipoFactura;
	private double precioTotal;
	private Date fecha;
	private int nroFactura;
	private String formaPago;
	
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "cabeza_factura_id")
	private List<DetalleFacturaEntity> detalleFactura;

	public FacturaEntity() {
		super();
		this.detalleFactura = new ArrayList<DetalleFacturaEntity>();
	}




	public String getFormaPago() {
		return formaPago;
	}

	public void setFormaPago(String formaPago) {
		this.formaPago = formaPago;
	}

	public String getTipoFactura() {
		return tipoFactura;
	}

	public void setTipoFactura(String tipoFactura) {
		this.tipoFactura = tipoFactura;
	}

	public double getPrecioTotal() {
		return precioTotal;
	}

	public void setPrecioTotal(double precioTotal) {
		this.precioTotal = precioTotal;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public int getNroFactura() {
		return nroFactura;
	}

	public void setNroFactura(int nroFactura) {
		this.nroFactura = nroFactura;
	}

	public List<DetalleFacturaEntity> getDetalleFactura() {
		return detalleFactura;
	}

	public void setDetalleFactura(List<DetalleFacturaEntity> detalleFactura) {
		this.detalleFactura = detalleFactura;
	}
	
	

}

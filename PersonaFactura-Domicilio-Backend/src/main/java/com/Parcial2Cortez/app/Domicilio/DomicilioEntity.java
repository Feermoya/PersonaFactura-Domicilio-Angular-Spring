package com.Parcial2Cortez.app.Domicilio;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Table;
import com.Parcial2Cortez.app.Common.CommonEntity;

@Entity
@Table(name = "domicilio")
public class DomicilioEntity extends CommonEntity implements Serializable {
	private static final long serialVersionUID = 5685412683798686451L;

	private String calle;
	private int numero;
	private int piso;
	private int nroDepartamento;
	private String aclaracion;
	
	


	public String getCalle() {
		return calle;
	}

	public void setCalle(String calle) {
		this.calle = calle;
	}

	public int getNumero() {
		return numero;
	}

	public void setNumero(int numero) {
		this.numero = numero;
	}

	public int getPiso() {
		return piso;
	}

	public void setPiso(int piso) {
		this.piso = piso;
	}

	public int getNroDepartamento() {
		return nroDepartamento;
	}

	public void setNroDepartamento(int nroDepartamento) {
		this.nroDepartamento = nroDepartamento;
	}

	public String getAclaracion() {
		return aclaracion;
	}

	public void setAclaracion(String aclaracion) {
		this.aclaracion = aclaracion;
	}
	
}
